CREATE TYPE "public"."assessment_type_enum" AS ENUM('PRETEST', 'QUIZ', 'TEST');--> statement-breakpoint
CREATE TYPE "public"."class_room_status_enum" AS ENUM('IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."course_status_enum" AS ENUM('OPEN', 'CLOSE', 'MAINTENANCE', 'FULL');--> statement-breakpoint
CREATE TYPE "public"."feature_type_enum" AS ENUM('INCLUDE', 'LANGUAGE');--> statement-breakpoint
CREATE TYPE "public"."method_enum" AS ENUM('E-WALLET', 'TRANSFER', 'DEBIT');--> statement-breakpoint
CREATE TYPE "public"."modul_type_enum" AS ENUM('LESSON', 'PRETEST', 'QUIZ', 'TEST');--> statement-breakpoint
CREATE TYPE "public"."order_status_enum" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('ESSAY', 'MULTIPLE');--> statement-breakpoint
CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'STUDENT', 'INSTRUCTOR');--> statement-breakpoint
CREATE TABLE "assessment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"duration" integer DEFAULT 15,
	"modul_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"type" "assessment_type_enum" DEFAULT 'QUIZ' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assessmentAttempt_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"option_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_attempt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"score" integer DEFAULT 15,
	"correct" integer DEFAULT 15,
	"wrong" integer DEFAULT 15,
	"started_at" timestamp DEFAULT now(),
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"assessment_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "class_room" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"join_at" timestamp DEFAULT now(),
	"status" "class_room_status_enum" DEFAULT 'IN_PROGRESS' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category_id" uuid NOT NULL,
	"price" numeric NOT NULL,
	"status" "course_status_enum" DEFAULT 'OPEN' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"persentage" numeric NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp DEFAULT now() NOT NULL,
	"course_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feature" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"course_id" uuid NOT NULL,
	"type" "feature_type_enum" DEFAULT 'INCLUDE' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instructor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"modul_id" uuid NOT NULL,
	"length" integer DEFAULT 5,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modul" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"course_id" uuid NOT NULL,
	"type" "modul_type_enum" DEFAULT 'LESSON' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "option" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"question_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"no_invoice" varchar(20) NOT NULL,
	"payment_id" uuid NOT NULL,
	"price" numeric NOT NULL,
	"discount" numeric NOT NULL,
	"admin_fee" numeric NOT NULL,
	"total" numeric NOT NULL,
	"status" "order_status_enum" DEFAULT 'PENDING' NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"method" "method_enum" DEFAULT 'TRANSFER' NOT NULL,
	"no_payment" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "procedures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"payment_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"assessment_id" uuid NOT NULL,
	"type" "question_type_enum" DEFAULT 'MULTIPLE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review" text NOT NULL,
	"rate" numeric NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"img" text,
	"name" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"job" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"role" "users_role_enum" DEFAULT 'STUDENT' NOT NULL,
	"refresh_token" text,
	"is_verified" boolean DEFAULT false,
	"verification_token" text,
	"verification_token_expiry" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_modul_id_modul_id_fk" FOREIGN KEY ("modul_id") REFERENCES "public"."modul"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_assessmentAttempt_id_assessment_attempt_id_fk" FOREIGN KEY ("assessmentAttempt_id") REFERENCES "public"."assessment_attempt"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment_answer" ADD CONSTRAINT "assessment_answer_option_id_option_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."option"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment_attempt" ADD CONSTRAINT "assessment_attempt_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "assessment_attempt" ADD CONSTRAINT "assessment_attempt_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "class_progress" ADD CONSTRAINT "class_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "class_progress" ADD CONSTRAINT "class_progress_lesson_id_lesson_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lesson"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "class_room" ADD CONSTRAINT "class_room_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "class_room" ADD CONSTRAINT "class_room_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "discount" ADD CONSTRAINT "discount_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "feature" ADD CONSTRAINT "feature_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "instructor" ADD CONSTRAINT "instructor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "instructor" ADD CONSTRAINT "instructor_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_modul_id_modul_id_fk" FOREIGN KEY ("modul_id") REFERENCES "public"."modul"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modul" ADD CONSTRAINT "modul_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "option" ADD CONSTRAINT "option_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "procedures" ADD CONSTRAINT "procedures_payment_id_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payment"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE cascade;