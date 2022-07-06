export default abstract class ArrayHelper {
    public static toObjectByKey<T>(arr: T[], key: string): { [k: string]: T } {
        let result = {}

        for (const item of arr) {
            result[item[key]] = item
        }

        return result
    }

    public static random<T>(arr: Array<T>): T {
        const index = Math.floor(Math.random() * arr.length)
        return arr[index]
    }
}