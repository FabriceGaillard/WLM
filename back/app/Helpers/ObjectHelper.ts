export default abstract class ObjectHelper {
    public static getPropertyFromArray(object: { [k: string]: any }, arr: string[]) {
        let result = object

        for (const a of arr) {
            if (!result[a]) return
            result = result[a]
        }

        return result
    }

    public static getPropertyFromPointedString(object: { [k: string]: any }, pointedString: string) {
        return ObjectHelper.getPropertyFromArray(object, pointedString.split('.'))
    }
}