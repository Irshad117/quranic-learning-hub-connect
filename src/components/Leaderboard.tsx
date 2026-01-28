import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeaderboard, useCategories } from '@/hooks/useQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Medal, Crown, User, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { leaderboard, loading } = useLeaderboard(selectedCategory);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">{index + 1}</span>;
    }
  };

  const getRankBg = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-300';
      case 1:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 border-gray-300';
      case 2:
        return 'bg-gradient-to-r from-orange-100 to-amber-100 border-orange-300';
      default:
        return 'bg-card border-border';
    }
  };

  const userRank = leaderboard.findIndex(entry => entry.user_id === user?.id);

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Leaderboard
          </CardTitle>
          <Select 
            value={selectedCategory || ''} 
            onValueChange={(value) => setSelectedCategory(value || null)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* User's rank highlight */}
        {user && userRank >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Your Current Rank</p>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold text-primary">#{userRank + 1}</span>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No scores yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboard.slice(0, 20).map((entry, index) => {
              const isCurrentUser = entry.user_id === user?.id;
              
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isCurrentUser 
                      ? 'ring-2 ring-primary ring-offset-2' 
                      : getRankBg(index)
                  }`}
                >
                  {/* Rank */}
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    {getRankIcon(index)}
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold truncate">
                          {entry.display_name || 'Anonymous'}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-primary">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.total_quizzes} {entry.total_quizzes === 1 ? 'quiz' : 'quizzes'}
                          {entry.streak_count > 0 && (
                            <span className="ml-2">
                              🔥 {entry.streak_count} day streak
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{entry.total_score}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
