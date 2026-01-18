import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Trash2 } from "lucide-react";
import { useDeleteProject } from "@/hooks/use-projects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="glass-card h-full flex flex-col overflow-hidden group hover:border-primary/50 transition-all duration-300">
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/50 text-muted-foreground font-display text-4xl font-bold opacity-20">
              {project.title.charAt(0)}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Delete Action - Top Right */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full shadow-lg">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-card border-white/10">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete "{project.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteProject(project.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium bg-secondary/50 hover:bg-secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex gap-3">
            {project.projectUrl && (
              <Button
                size="sm"
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/5"
                asChild
              >
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-white/10 hover:bg-white/5 hover:text-primary hover:border-primary/50"
                asChild
              >
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
