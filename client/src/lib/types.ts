export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
};

export type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
};

export type WSNotification = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  readAt: Date;
};

export type Session = { userId: string; token: string } | null;

export type User = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type UserData = {
  userId: string;
  name: string;
  avatar: string | null;
};

export type Role = "Owner" | "ScrumMaster" | "Executor";

export type Project = {
  id: string;
  name: string;
  avatar: string | null;
  role: Role;
  createdAt: Date;
  closedAt: Date | null;
};

export type Member = {
  id: string;
  name: string;
  avatar: string;
  role: Role;
  userId: string;
};

export type Invite = {
  id: string;
  userName: string;
  userAvatar: string | null;
  role: Role;
  createdAt: Date;
};

export type UserInvite = {
  id: string;
  role: Role;
  createdAt: Date;
  projectName: string;
  projectAvatar: string | null;
};

export type ProjectSprint = {
  id: string;
  name: string;
  start: Date | null;
  end: Date | null;
  createdAt: Date;
  status: SprintStatus;
};

type SprintStatus =
  | "Planning"
  | "PokerPlanning"
  | "WaitStart"
  | "InProgress"
  | "End";

export type Priority = "Critical" | "High" | "Medium" | "Low" | "Minor";
export type StoryStatus = "Waiting" | "InProgress" | "Finished";

export type UserStory = {
  id: string;
  title: string;
  text: string;
  priority: Priority;
  mark: number | null;
  status: StoryStatus;
  start: Date | null;
  end: Date | null;
  userId: string | null;
  tasks: StoryTask[];
};

export type StoryTask = {
  id: string;
  title: string;
  text: string;
  isDone: boolean;
};

export type Message = {
  text: string;
  userId: string;
  createdAt: Date;
};

export type ReportChart = {
  points: ReportPoint[];
};

export type ReportPoint = {
  pointNumber: number;
  sprintName: string;
  storyPoints: number;
};
