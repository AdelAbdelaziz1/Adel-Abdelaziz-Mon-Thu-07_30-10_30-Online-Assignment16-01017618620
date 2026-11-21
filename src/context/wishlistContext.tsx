"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  addToWishlistAction,
  getWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlist.actions";

interface WishlistContextI {
  wishlistIds: string[];
  count: number;
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  isPending: (productId: string) => boolean;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextI | null>(null);

const toId = (item: string | { _id: string }) =>
  typeof item === "string" ? item : item._id;

export function WishlistContextProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pendingRef = useRef<Set<string>>(new Set());

  const refreshWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getWishlistAction();
      if (response?.status === "success" && Array.isArray(response.data)) {
        setWishlistIds(response.data.map(toId));
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      refreshWishlist();
    } else if (status === "unauthenticated") {
      setWishlistIds([]);
    }
  }, [status, refreshWishlist]);

  const mutate = useCallback(
    async (productId: string, action: "add" | "remove") => {
      if (status !== "authenticated") {
        toast.error("Please login to use your wishlist");
        router.push("/login");
        return false;
      }

      if (pendingRef.current.has(productId)) return false;
      pendingRef.current.add(productId);
      setPendingIds((prev) => [...prev, productId]);

      // Optimistic update
      setWishlistIds((cur) =>
        action === "add"
          ? cur.includes(productId)
            ? cur
            : [...cur, productId]
          : cur.filter((id) => id !== productId)
      );

      try {
        const response =
          action === "add"
            ? await addToWishlistAction(productId)
            : await removeFromWishlistAction(productId);

        if (response?.status !== "success") {
          throw new Error(response?.message || "Request failed");
        }

        if (Array.isArray(response.data)) {
          setWishlistIds(response.data.map(toId));
        }

        toast.success(
          action === "add" ? "Added to wishlist" : "Removed from wishlist"
        );
        return true;
      } catch (error) {
        setWishlistIds((cur) =>
          action === "add"
            ? cur.filter((id) => id !== productId)
            : cur.includes(productId)
              ? cur
              : [...cur, productId]
        );
        toast.error(
          error instanceof Error && error.message
            ? error.message
            : "Something went wrong"
        );
        return false;
      } finally {
        pendingRef.current.delete(productId);
        setPendingIds((prev) => prev.filter((id) => id !== productId));
      }
    },
    [status, router]
  );

  const addToWishlist = useCallback(
    (productId: string) => mutate(productId, "add"),
    [mutate]
  );
  const removeFromWishlist = useCallback(
    (productId: string) => mutate(productId, "remove"),
    [mutate]
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      await mutate(
        productId,
        wishlistIds.includes(productId) ? "remove" : "add"
      );
    },
    [mutate, wishlistIds]
  );

  const value = useMemo<WishlistContextI>(
    () => ({
      wishlistIds,
      count: wishlistIds.length,
      isLoading,
      isInWishlist: (id) => wishlistIds.includes(id),
      isPending: (id) => pendingIds.includes(id),
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      refreshWishlist,
    }),
    [
      wishlistIds,
      pendingIds,
      isLoading,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      refreshWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used inside <WishlistContextProvider>");
  }
  return ctx;
}