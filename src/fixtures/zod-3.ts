import {z} from 'zod-3';

// --- String ---
export const stringSchema = z.string();
export const stringData = 'hello world';

// --- Number ---
export const numberSchema = z.number();
export const numberData = 42;

// --- Array ---
export const stringArraySchema = z.array(z.string());
export const stringArrayData = ['hello', ' ', 'world', '!'];

export const arrayIntersectionSchema = z.array(z.object({ a: z.string() })).and(z.array(z.object({ b: z.string() })));
export const arrayIntersectionData = [
    { a: 'hello', b: 'world' },
    { a: 'number', b: '42' },
];

export const generalizedArrayIntersectionSchema = z.intersection(z.array(z.object({ a: z.string() })), z.array(z.object({ b: z.string() })));
export const generalizedArrayIntersectionData = [
    { a: 'hello', b: 'world' },
    { a: 'number', b: '42' },
];

// --- Object ---
export const objectSchema = z.object({
    a: z.string(),
    b: z.string(),
    c: z.object({ nested: z.number() }),
});
export const objectData = {
    a: 'hello',
    b: 'world',
    c: { nested: 123 },
};

// --- Records ---
export const recordSchema = z.record(z.record(z.number()));
export const recordData = {
    a: { a: 1, b: 2 },
    b: { c: 3, d: 4 },
    c: { c: 3, d: 4 },
    d: { c: 3, d: 4 },
};

// --- Intersections ---
export const objectIntersectionSchema = z.object({ a: z.string() }).and(z.object({ b: z.number() }));
export const objectIntersectionData = { a: 'hello', b: 42 };

export const generalizedObjectIntersectionSchema = z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() }));
export const generalizedObjectIntersectionData = { a: 'hello', b: 42 };

export const recordIntersectionSchema = z.record(z.object({ a: z.string() })).and(z.record(z.object({ b: z.number() })));
export const recordIntersectionData = { one: { a: 'hello', b: 1 }, two: { a: 'world', b: 2 } };

