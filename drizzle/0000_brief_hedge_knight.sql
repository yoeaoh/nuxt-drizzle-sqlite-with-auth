CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`age` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
