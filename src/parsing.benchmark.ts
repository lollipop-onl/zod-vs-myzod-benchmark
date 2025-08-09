import Benchmark from 'benchmark';

// ベンチマークスイートを作成
const suite = new Benchmark.Suite('Zod Parsing Benchmarks');

const fixtures = process.env.ZOD_VERSION?.includes('npm:zod@4')
  ? await import('./fixtures/zod-4')
    : await import('./fixtures/zod-3');

// スイートにテストケースを追加
suite
    .add('String: no validations', () => {
        fixtures.stringSchema.parse(fixtures.stringData);
    })
    .add('Number: no validations', () => {
        fixtures.numberSchema.parse(fixtures.numberData);
    })
    .add('Array: String Array', () => {
        fixtures.stringArraySchema.parse(fixtures.stringArrayData);
    })
    .add('Array: intersection of two object arrays', () => {
        fixtures.arrayIntersectionSchema.parse(fixtures.arrayIntersectionData);
    })
    .add('Array: generalized intersection of two object arrays', () => {
        fixtures.generalizedArrayIntersectionSchema.parse(fixtures.generalizedArrayIntersectionData);
    })
    .add('Object: regular object', () => {
        fixtures.objectSchema.parse(fixtures.objectData);
    })
    .add('Records: record of record', () => {
        fixtures.recordSchema.parse(fixtures.recordData);
    })
    .add('Intersections: Object Intersections', () => {
        fixtures.objectIntersectionSchema.parse(fixtures.objectIntersectionData);
    })
    .add('Intersections: Generalized Object Intersection', () => {
        fixtures.generalizedObjectIntersectionSchema.parse(fixtures.generalizedObjectIntersectionData);
    })
    .add('Intersections: object record intersections', () => {
        fixtures.recordIntersectionSchema.parse(fixtures.recordIntersectionData);
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