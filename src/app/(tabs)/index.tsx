import { useAuth } from "@clerk/expo";
import { FlatList, Text, View } from "react-native";
import { useGroceryStore } from "@/src/app/store/grocery-store";
import TabScreenBackground from "../components/TabScreenBackground";
import ListHeroCard from "../components/list/ListHeroCard";
import PendingItemCard from "../components/list/PendingItemCard";
import { ScrollView } from "react-native";
import CompletedItems from "../components/list/CompletedItems";

export default function Home() {
  const { signOut } = useAuth();
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);
  return (
     <FlatList
      className="flex-1 bg-background "
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14, paddingTop: 20 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">{pendingItems.length} active</Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItems />}
    />
  );
}

