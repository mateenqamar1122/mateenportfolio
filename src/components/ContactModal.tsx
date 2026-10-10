import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const PROJECT_OPTIONS = [
  "E-commerce Website",
  "SaaS Application",
  "Landing Page",
  "Admin Dashboard",
  "Mobile App Backend",
  "API Development",
  "Cloud Infrastructure"
];

export const ContactModal = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [need, setNeed] = useState("");

  const toggleProject = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  const handleWhatsApp = () => {
    const projectsStr = selectedProjects.length > 0 ? selectedProjects.join(", ") : "None selected";
    const text = `*New Project Inquiry*\n\n*Name:* ${name}\n*Required Projects:* ${projectsStr}\n*Need:* ${need}`;
    const encodedText = encodeURIComponent(text);
    // Formatting number as Pakistani +92 for standard WhatsApp link
    const url = `https://wa.me/923075451890?text=${encodedText}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary" style={{ fontFamily: 'var(--font-display)' }}>Start a Project</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your details below and we'll start a conversation on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name" 
              className="bg-background border-border text-foreground focus-visible:ring-primary"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Required Projects</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex min-h-[40px] w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                  <div className="flex flex-wrap gap-1 text-left">
                    {selectedProjects.length === 0 && (
                      <span className="text-muted-foreground">Select project types...</span>
                    )}
                    {selectedProjects.map((p) => (
                      <Badge key={p} variant="secondary" className="px-2 py-0.5 text-xs font-medium bg-primary/15 text-primary hover:bg-primary/25 border-primary/20">
                        {p}
                      </Badge>
                    ))}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[375px] max-h-[250px] overflow-y-auto bg-popover border-border text-popover-foreground" align="start">
                {PROJECT_OPTIONS.map((project) => (
                  <DropdownMenuCheckboxItem
                    key={project}
                    checked={selectedProjects.includes(project)}
                    onCheckedChange={() => toggleProject(project)}
                    className="focus:bg-accent focus:text-accent-foreground cursor-pointer py-2"
                  >
                    {project}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="need" className="text-sm font-medium text-foreground">Need</label>
            <Textarea 
              id="need" 
              value={need} 
              onChange={(e) => setNeed(e.target.value)} 
              placeholder="Describe your requirements in detail..." 
              className="bg-background border-border text-foreground focus-visible:ring-primary min-h-[100px]"
            />
          </div>
          <button
            onClick={handleWhatsApp}
            disabled={!name || selectedProjects.length === 0 || !need}
            className="mt-4 w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Send on WhatsApp <ArrowUpRight size={18} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
