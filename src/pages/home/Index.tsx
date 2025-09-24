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


// tree: node -e "const fs=require('fs'),p=process.argv[1]||'.',d=(x,l=0)=>{if(l>3)return;let s='';for(const f of fs.readdirSync(x,{withFileTypes:true}))if(!['.git','node_modules','.next','dist','build'].includes(f.name)){s+='|  '.repeat(l)+(f.isDirectory()?'├─ ':'├─ ')+f.name+(f.isDirectory()?'/':'')+'\n';if(f.isDirectory())s+=d(x+'/'+f.name,l+1)}return s};fs.writeFileSync('ARBOL.txt',p+'\n'+d(p));"
