// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import NotFound from "./pages/home/NotFound";
import MLPPageDocs from "./pages/mlp/docs/Index"; // MLP docs
import MLPPageDemo from "./pages/mlp/demo/Index"; // MLP demo

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* 2. Agrega la nueva ruta aquí */}
          <Route path="/mlp" element={<MLPPageDocs />} />
          <Route path="/mlp_demo" element={<MLPPageDemo />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// tree: node -e "const fs=require('fs'),p=process.argv[1]||'.',d=(x,l=0)=>{if(l>3)return;let s='';for(const f of fs.readdirSync(x,{withFileTypes:true}))if(!['.git','node_modules','.next','dist','build'].includes(f.name)){s+='|  '.repeat(l)+(f.isDirectory()?'├─ ':'├─ ')+f.name+(f.isDirectory()?'/':'')+'\n';if(f.isDirectory())s+=d(x+'/'+f.name,l+1)}return s};fs.writeFileSync('ARBOL.txt',p+'\n'+d(p));"