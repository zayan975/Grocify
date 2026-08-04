import ClearCompletedButton from "@/src/app/components/insights/ClearCompletedButton";
import InsightsCategorySection from "@/src/app/components/insights/InsightsCategorySection";
import InsightsPrioritySection from "@/src/app/components/insights/InsightsPrioritySection";
import InsightsStatsSection from "@/src/app/components/insights/InsightsStatsSection";
import SentryFeedbackButton from "@/components/insights/SentryFeedbackButton";
import UserProfile from "@/src/app/components/insights/UserProfile";
import TabScreenBackground from "@/src/app/components/TabScreenBackground";
import { ScrollView } from "react-native";

const InsightsScreen = () => {
  return (
    <>
      <ScrollView
        className="flex-1 bg-background py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20,paddingBottom: 100, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />

        <UserProfile />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <ClearCompletedButton />
      </ScrollView>

      {/* <SentryFeedbackButton /> */}
    </>
  );
};

export default InsightsScreen;