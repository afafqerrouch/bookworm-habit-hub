
import { Progress } from "@/components/ui/progress";
import { Trophy, Book, Star, Bookmark, Clock } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  earned: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  goal: number;
  icon: JSX.Element;
}

const badges: Badge[] = [
  {
    id: "b1",
    name: "Bookworm",
    description: "Read 5 books in a month",
    icon: <Book className="h-5 w-5" />,
    earned: true,
  },
  {
    id: "b2",
    name: "Reviewer",
    description: "Write 10 meaningful reviews",
    icon: <Star className="h-5 w-5" />,
    earned: true,
  },
  {
    id: "b3",
    name: "Explorer",
    description: "Read books from 5 different genres",
    icon: <Bookmark className="h-5 w-5" />,
    earned: false,
  },
  {
    id: "b4",
    name: "Night Owl",
    description: "Purchase a book after midnight",
    icon: <Clock className="h-5 w-5" />,
    earned: false,
  },
];

const achievements: Achievement[] = [
  {
    id: "a1",
    name: "Reading Streak",
    description: "Daily reading for 30 days",
    progress: 12,
    goal: 30,
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    id: "a2",
    name: "Genre Master",
    description: "Read books from 10 different genres",
    progress: 4,
    goal: 10,
    icon: <Book className="h-5 w-5" />,
  },
];

const UserAchievements = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-serif font-bold mb-4">Your Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`border rounded-lg p-4 text-center ${
                badge.earned
                  ? "border-book-purple/30 bg-book-purple/5"
                  : "border-dashed border-muted-foreground/50 bg-muted/30 opacity-60"
              }`}
            >
              <div
                className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned
                    ? "bg-book-purple/20 text-book-purple"
                    : "bg-muted/50 text-muted-foreground/70"
                }`}
              >
                {badge.icon}
              </div>
              <h4 className="font-medium">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {badge.description}
              </p>
              {badge.earned && (
                <span className="inline-block mt-2 text-xs bg-book-purple/10 text-book-purple px-2 py-0.5 rounded-full">
                  Earned
                </span>
              )}
              {!badge.earned && (
                <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-serif font-bold mb-4">Achievements in Progress</h3>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border border-border rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-book-purple/10 text-book-purple w-10 h-10 rounded-full flex items-center justify-center">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-medium">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">
                    {achievement.progress} / {achievement.goal}
                  </span>
                </div>
                <Progress
                  value={(achievement.progress / achievement.goal) * 100}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAchievements;
