import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 *
 * @description
 * Reusable validation schemas for common data types
 */

/**
 * @constant zString
 * @description Non-empty string validation
 */
export const zString = z.string().min(1, 'Field is required');

/**
 * @constant zNullableString
 * @description Nullable string validation
 */
export const zNullableString = z.string().nullable();

/**
 * @constant zNumber
 * @description Number validation
 */
export const zNumber = z.number();

/**
 * @constant zPositiveNumber
 * @description Positive number validation
 */
export const zPositiveNumber = z.number().positive('Must be a positive number');

/**
 * @constant zBoolean
 * @description Boolean validation
 */
export const zBoolean = z.boolean();

/**
 * @constant zDate
 * @description Date validation
 */
export const zDate = z.date();

/**
 * @constant zDateString
 * @description ISO date string validation
 */
export const zDateString = z.string().datetime();

/**
 * @constant zEmail
 * @description Email validation
 */
export const zEmail = z.string().email('Invalid email format');

/**
 * @constant zId
 * @description ID validation (positive integer)
 */
export const zId = z.number().int().positive('Invalid ID');

/**
 * @constant zNullableId
 * @description Nullable ID validation
 */
export const zNullableId = z.number().int().positive().nullable();
