import { useGroceryStore } from "@/store/grocery-store";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text } from "react-native";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    setIsClearing(true);
    await clearPurchased();
    setTimeout(() => setIsClearing(false), 800);
  };

  return (
    <Pressable
      className="flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-3"
      onPress={handleClear}
      disabled={isClearing}
    >
      {isClearing ? (
        <>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text className="text-center text-base font-semibold text-primary-foreground">
            Clearing...
          </Text>
        </>
      ) : (
        <Text className="text-center text-base font-semibold text-primary-foreground">
          Clear completed items
        </Text>
      )}
    </Pressable>
  );
}