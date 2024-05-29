// An instance of a unit associated with a student
// called a "Project" in the OnTrack API
import { TargetGrades } from './constants.ts';

export type UnitEnrolment = {
	// Fields fetched both when fetching all "projects" and an individual "project"
	campus_id: number | null;
	id: number;
	portfolio_available: boolean;
	target_grade: number;
	user_id: number;
	unit: Unit;
	// Fields fetched when fetching details for an individual "project"
	tasks: TaskSubmission[];
	// There's also more fields that I don't need to care about at this point
};

export type Unit = {
	id: number;
	name: string;
	code: string;
	my_role: string;
	active: boolean;
	start_date: string;
	end_date: string;
	teaching_period_id: number;
};

// Overall task details at the unit level
export type TaskDefinition = {
	id: number;
	abbreviation: string;
	name: string;
	description: string;
	weighting: number;
	target_grade: number;
	target_date: string;
	due_date: string;
	start_date: string;
	upload_requirements: {
		key: string;
		name: string;
		type: string;
	}[];
	has_task_sheet: boolean;
	has_task_resources: false;
	has_task_assessment_resources: false;
	max_quality_pts: number;
	is_graded: boolean;
	// There's also more fields that I don't need to care about at this point
};

// Individual student's submission of a task, at the enrolment ("project" in the API) level
export type TaskSubmission = {
	id: number;
	task_definition_id: number;
	status: TaskStatus;
	due_date: string;
	// There's also more fields that I don't need to care about at this point
};

export type TaskStatus = 'not_started' | 'ready_for_feedback' | 'complete' | 'fix_and_resubmit' | 'feedback_exceeded' | 'discuss' | 'time_exceeded' | 'working_on_it' | 'need_help';

// Combination of the relevant fields from a unit, task definition, and task submission
export type TaskTableRow = TaskSubmission & {
	unitCode: string;
	unitName: string;
	unitId: number;
	taskName: string;
	taskTargetGrade: typeof TargetGrades[number];
};
