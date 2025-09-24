// src/pages/home/Index.tsx
import Header from "@/components/home/Header";
import NeuralNetworkRoadmap from "@/components/home/NeuralNetworkRoadmap";
import DonationsSection from "@/components/home/DonationsSection";
import FounderSection from "@/components/home/FounderSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-linear snap-y snap-mandatory">
      <section className="snap-start"><Header /></section>
      <section className="snap-start"><NeuralNetworkRoadmap /></section>
      <section className="snap-start"><DonationsSection /></section>
      <section className="snap-start"><FounderSection /></section>
    </div>
  );
};

export default Index;

