"use client";

import { useLocalStorage } from "./useLocalStorage";

export const GUEST_MESSAGE_LIMIT = 3;

export function useChatLimit() {
  const [authToken] = useLocalStorage<string | null>("avoriq_auth_token", null);
  const [messageCount, setMessageCount] = useLocalStorage<number>("avoriq_guest_msg_count", 0);

  const isAuthenticated = !!authToken;
  const isLimitReached = !isAuthenticated && messageCount >= GUEST_MESSAGE_LIMIT;

  const incrementMessageCount = () => {
    if (!isAuthenticated) {
      setMessageCount(messageCount + 1);
    }
  };

  return {
    isAuthenticated,
    isLimitReached,
    messageCount,
    incrementMessageCount,
    limit: GUEST_MESSAGE_LIMIT
  };
}
