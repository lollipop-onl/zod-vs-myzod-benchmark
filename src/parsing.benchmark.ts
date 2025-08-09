import Benchmark from 'benchmark';
import * as z from 'zod';

// ベンチマークスイートを作成
const suite = new Benchmark.Suite('Zod Parsing Benchmarks');

console.log('Running Zod Parsing Benchmarks...');

// --- String ---
const stringSchema = z.string();
const stringData = 'hello world';

// --- Number ---
const numberSchema = z.number();
const numberData = 42;

// --- Array ---
const stringArraySchema = z.array(z.string());
const stringArrayData = ['hello', ' ', 'world', '!'];

const arrayIntersectionSchema = z.array(z.object({ a: z.string() })).and(z.array(z.object({ b: z.string() })));
const arrayIntersectionData = [
    { a: 'hello', b: 'world' },
    { a: 'number', b: '42' },
];

const generalizedArrayIntersectionSchema = z.intersection(z.array(z.object({ a: z.string() })), z.array(z.object({ b: z.string() })));
const generalizedArrayIntersectionData = [
    { a: 'hello', b: 'world' },
    { a: 'number', b: '42' },
];

// --- Object ---
const objectSchema = z.object({
    a: z.string(),
    b: z.string(),
    c: z.object({ nested: z.number() }),
});
const objectData = {
    a: 'hello',
    b: 'world',
    c: { nested: 123 },
};

// --- Records ---
const recordSchema = z.record(z.record(z.number()));
const recordData = {
    a: { a: 1, b: 2 },
    b: { c: 3, d: 4 },
    c: { c: 3, d: 4 },
    d: { c: 3, d: 4 },
};

// --- Intersections ---
const objectIntersectionSchema = z.object({ a: z.string() }).and(z.object({ b: z.number() }));
const objectIntersectionData = { a: 'hello', b: 42 };

const generalizedObjectIntersectionSchema = z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() }));
const generalizedObjectIntersectionData = { a: 'hello', b: 42 };

const recordIntersectionSchema = z.record(z.object({ a: z.string() })).and(z.record(z.object({ b: z.number() })));
const recordIntersectionData = { one: { a: 'hello', b: 1 }, two: { a: 'world', b: 2 } };


// スイートにテストケースを追加
suite
    .add('String: no validations', () => {
        stringSchema.parse(stringData);
    })
    .add('Number: no validations', () => {
        numberSchema.parse(numberData);
    })
    .add('Array: String Array', () => {
        stringArraySchema.parse(stringArrayData);
    })
    .add('Array: intersection of two object arrays', () => {
        arrayIntersectionSchema.parse(arrayIntersectionData);
    })
    .add('Array: generalized intersection of two object arrays', () => {
        generalizedArrayIntersectionSchema.parse(generalizedArrayIntersectionData);
    })
    .add('Object: regular object', () => {
        objectSchema.parse(objectData);
    })
    .add('Records: record of record', () => {
        recordSchema.parse(recordData);
    })
    .add('Intersections: Object Intersections', () => {
        objectIntersectionSchema.parse(objectIntersectionData);
    })
    .add('Intersections: Generalized Object Intersection', () => {
        generalizedObjectIntersectionSchema.parse(generalizedObjectIntersectionData);
    })
    .add('Intersections: object record intersections', () => {
        recordIntersectionSchema.parse(recordIntersectionData);
    })
    // 各テストサイクルの完了時に結果をログに出力
    .on('cycle', (event: Benchmark.Event) => {
        console.log(String(event.target));
    })
    // 全てのテストが完了した時に最速の結果を報告
    .on('complete', function (this: Benchmark.Suite) {
        console.log('---------------------------------');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('---------------------------------');
    })
    // ベンチマークを非同期で実行
    .run({ 'async': true });