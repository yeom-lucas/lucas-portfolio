import type { Project } from '../../types';
import { chargingSettlement } from './charging-settlement';
import { obdPipeline } from './obd-pipeline';
import { safeNotify } from './safe-notify';

/** 배열 순서가 곧 화면 표시 순서다 */
export const projects: Project[] = [chargingSettlement, obdPipeline, safeNotify];
