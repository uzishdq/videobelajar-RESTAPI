import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  text,
  uuid,
  pgEnum,
  numeric,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// schema db
export const userRoleEnum = pgEnum("users_role_enum", [
  "ADMIN",
  "STUDENT",
  "INSTRUCTOR",
]);

export const users = pgTable("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  img: text("img"),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  job: varchar("job", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("STUDENT").notNull(),
  refreshToken: text("refresh_token"),
  isVerified: boolean("is_verified").default(false),
  verificationToken: text("verification_token"),
  verificationTokenExpiry: timestamp("verification_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const courseStatusEnum = pgEnum("course_status_enum", [
  "OPEN",
  "CLOSE",
  "MAINTENANCE",
  "FULL",
]);

export const course = pgTable("course", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  price: numeric("price").notNull(),
  status: courseStatusEnum("status").default("OPEN").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const instructor = pgTable("instructor", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const featureTypeEnum = pgEnum("feature_type_enum", [
  "INCLUDE",
  "LANGUAGE",
]);

export const feature = pgTable("feature", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  type: featureTypeEnum("type").default("INCLUDE").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const discount = pgTable("discount", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  persentage: numeric("persentage").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").defaultNow().notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const modulTypeEnum = pgEnum("modul_type_enum", [
  "LESSON",
  "PRETEST",
  "QUIZ",
  "TEST",
]);

export const modul = pgTable("modul", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  type: modulTypeEnum("type").default("LESSON").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const lesson = pgTable("lesson", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  modulId: uuid("modul_id")
    .notNull()
    .references(() => modul.id, { onDelete: "cascade", onUpdate: "cascade" }),
  length: integer("length").default(5),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const assessmentTypeEnum = pgEnum("assessment_type_enum", [
  "PRETEST",
  "QUIZ",
  "TEST",
]);

export const assessment = pgTable("assessment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  duration: integer("duration").default(15),
  modulId: uuid("modul_id")
    .notNull()
    .references(() => modul.id, { onDelete: "cascade", onUpdate: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  type: assessmentTypeEnum("type").default("QUIZ").notNull(),
});

export const questionTypeEnum = pgEnum("question_type_enum", [
  "ESSAY",
  "MULTIPLE",
]);

export const question = pgTable("question", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  question: text("question").notNull(),
  assessmentId: uuid("assessment_id")
    .notNull()
    .references(() => assessment.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  type: questionTypeEnum("type").default("MULTIPLE").notNull(),
});

export const option = pgTable("option", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  label: text("label").notNull(),
  isCorrect: boolean("is_correct").default(false).notNull(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => question.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const assessmentAttempt = pgTable("assessment_attempt", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  score: integer("score").default(15),
  correct: integer("correct").default(15),
  wrong: integer("wrong").default(15),
  startedAt: timestamp("started_at").defaultNow(),
  submittedAt: timestamp("submitted_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  assessmentId: uuid("assessment_id")
    .notNull()
    .references(() => assessment.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const assessmentAnswer = pgTable("assessment_answer", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  assessmentAttemptId: uuid("assessmentAttempt_id")
    .notNull()
    .references(() => assessmentAttempt.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => question.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  optionId: uuid("option_id")
    .notNull()
    .references(() => option.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const review = pgTable("review", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  review: text("review").notNull(),
  rate: numeric("rate").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const classRoomStatusEnum = pgEnum("class_room_status_enum", [
  "IN_PROGRESS",
  "COMPLETED",
]);

export const classRoom = pgTable("class_room", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  joinAt: timestamp("join_at").defaultNow(),
  status: classRoomStatusEnum("status").default("IN_PROGRESS").notNull(),
});

export const classProgress = pgTable("class_progress", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at").defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lesson.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const methodEnum = pgEnum("method_enum", [
  "E-WALLET",
  "TRANSFER",
  "DEBIT",
]);

export const payment = pgTable("payment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  method: methodEnum("method").default("TRANSFER").notNull(),
  noPayment: text("no_payment").notNull(),
});

export const procedures = pgTable("procedures", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  paymentId: uuid("payment_id")
    .notNull()
    .references(() => payment.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const orderStatusEnum = pgEnum("order_status_enum", [
  "PENDING",
  "COMPLETED",
  "CANCELLED",
]);

export const order = pgTable("order", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  noInvoice: varchar("no_invoice", { length: 20 }).notNull(),
  paymentId: uuid("payment_id")
    .notNull()
    .references(() => payment.id, { onDelete: "cascade", onUpdate: "cascade" }),
  price: numeric("price").notNull(),
  discount: numeric("discount").notNull(),
  adminFee: numeric("admin_fee").notNull(),
  total: numeric("total").notNull(),
  status: orderStatusEnum("status").default("PENDING").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade", onUpdate: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// relations

export const usersRelations = relations(users, ({ many }) => ({
  instructors: many(instructor),
  reviews: many(review),
  classRooms: many(classRoom),
  classProgresses: many(classProgress),
  assessmentAttempts: many(assessmentAttempt),
  orders: many(order),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  courses: many(course),
}));

export const courseRelations = relations(course, ({ one, many }) => ({
  category: one(category, {
    fields: [course.categoryId],
    references: [category.id],
  }),
  instructors: many(instructor),
  features: many(feature),
  discounts: many(discount),
  moduls: many(modul),
  assessments: many(assessment),
  reviews: many(review),
  classRooms: many(classRoom),
  orders: many(order),
}));

export const instructorRelations = relations(instructor, ({ one }) => ({
  user: one(users, {
    fields: [instructor.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [instructor.courseId],
    references: [course.id],
  }),
}));

export const featureRelations = relations(feature, ({ one }) => ({
  course: one(course, {
    fields: [feature.courseId],
    references: [course.id],
  }),
}));

export const discountRelations = relations(discount, ({ one }) => ({
  course: one(course, {
    fields: [discount.courseId],
    references: [course.id],
  }),
}));

export const modulRelations = relations(modul, ({ one, many }) => ({
  course: one(course, {
    fields: [modul.courseId],
    references: [course.id],
  }),
  lessons: many(lesson),
  assessments: many(assessment),
}));

export const lessonRelations = relations(lesson, ({ one, many }) => ({
  modul: one(modul, {
    fields: [lesson.modulId],
    references: [modul.id],
  }),
  classProgresses: many(classProgress),
}));

export const assessmentRelations = relations(assessment, ({ one, many }) => ({
  modul: one(modul, {
    fields: [assessment.modulId],
    references: [modul.id],
  }),
  course: one(course, {
    fields: [assessment.courseId],
    references: [course.id],
  }),
  questions: many(question),
  attempts: many(assessmentAttempt),
}));

export const questionRelations = relations(question, ({ one, many }) => ({
  assessment: one(assessment, {
    fields: [question.assessmentId],
    references: [assessment.id],
  }),
  options: many(option),
  assessmentAnswers: many(assessmentAnswer),
}));

export const optionRelations = relations(option, ({ one, many }) => ({
  question: one(question, {
    fields: [option.questionId],
    references: [question.id],
  }),
  assessmentAnswers: many(assessmentAnswer),
}));

export const assessmentAttemptRelations = relations(
  assessmentAttempt,
  ({ one, many }) => ({
    assessment: one(assessment, {
      fields: [assessmentAttempt.assessmentId],
      references: [assessment.id],
    }),
    user: one(users, {
      fields: [assessmentAttempt.userId],
      references: [users.id],
    }),
    answers: many(assessmentAnswer),
  }),
);

export const assessmentAnswerRelations = relations(
  assessmentAnswer,
  ({ one }) => ({
    attempt: one(assessmentAttempt, {
      fields: [assessmentAnswer.assessmentAttemptId],
      references: [assessmentAttempt.id],
    }),
    question: one(question, {
      fields: [assessmentAnswer.questionId],
      references: [question.id],
    }),
    option: one(option, {
      fields: [assessmentAnswer.optionId],
      references: [option.id],
    }),
  }),
);

export const reviewRelations = relations(review, ({ one }) => ({
  user: one(users, {
    fields: [review.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [review.courseId],
    references: [course.id],
  }),
}));

export const classRoomRelations = relations(classRoom, ({ one }) => ({
  user: one(users, {
    fields: [classRoom.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [classRoom.courseId],
    references: [course.id],
  }),
}));

export const classProgressRelations = relations(classProgress, ({ one }) => ({
  user: one(users, {
    fields: [classProgress.userId],
    references: [users.id],
  }),
  lesson: one(lesson, {
    fields: [classProgress.lessonId],
    references: [lesson.id],
  }),
}));

export const paymentRelations = relations(payment, ({ many }) => ({
  procedures: many(procedures),
  orders: many(order),
}));

export const proceduresRelations = relations(procedures, ({ one }) => ({
  payment: one(payment, {
    fields: [procedures.paymentId],
    references: [payment.id],
  }),
}));

export const orderRelations = relations(order, ({ one }) => ({
  payment: one(payment, {
    fields: [order.paymentId],
    references: [payment.id],
  }),
  user: one(users, {
    fields: [order.userId],
    references: [users.id],
  }),
  course: one(course, {
    fields: [order.courseId],
    references: [course.id],
  }),
}));
