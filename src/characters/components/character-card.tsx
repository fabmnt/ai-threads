import { MessageCircle } from 'lucide-react';
import type { Doc } from '@/convex/_generated/dataModel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

interface CharacterCardProps {
  character: Doc<'characters'>;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
        <p>@{character.character_username}</p>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {character.description}
        </CardDescription>
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{character.total_threads ?? 0} threads</span>
          </div>
          <span>{character.total_messages ?? 0} messages</span>
        </div>
      </CardContent>
    </Card>
  );
}
