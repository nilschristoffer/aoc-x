export type ApiLeaderboard = {
  event: string;
  members: { [id: string]: ApiMember };
  owner_id: number;
};

export type ApiMember = {
  id: number;
  name?: string | null;
  local_score: number;
  global_score: number;
  stars: number;
  last_star_ts: number;
  completion_day_level: ApiCompletionDayLevel;
};

export type ApiCompletionDayLevel = {
  [day: string]: ApiDayLevel;
};

export type ApiDayLevel = {
  [part: string]: ApiStarResult;
};

export type ApiStarResult = {
  get_star_ts: number;
  star_index: number;
};
