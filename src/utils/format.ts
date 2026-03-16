export const formatScore = (score: number | null | undefined): string => {
  if (!score) return 'N/A';
  return score.toFixed(1);
};

export const formatEpisodes = (episodes: number | null | undefined): string => {
  if (!episodes) return 'Unknown';
  return episodes.toString();
};

export const formatNumber = (num: number | null | undefined): string => {
  if (!num) return 'N/A';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
};

export const getScoreColor = (score: number | null): string => {
  if (!score) return '#6b7280';
  if (score >= 8.5) return '#00f5a0';
  if (score >= 7.5) return '#06b6d4';
  if (score >= 6.0) return '#f59e0b';
  return '#ef4444';
};

export const formatStatus = (status: string): string => {
  const map: Record<string, string> = {
    'Finished Airing': 'Finished',
    'Currently Airing': 'Airing',
    'Not yet aired': 'Upcoming',
  };
  return map[status] || status;
};
