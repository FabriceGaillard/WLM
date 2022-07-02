export default abstract class ArrayHelper {
    public static toObjectByKey(arr: any[], key: string) {
        let result = {}

        for (const item of arr) {
            result[item[key]] = item
        }

        return result
    }
}