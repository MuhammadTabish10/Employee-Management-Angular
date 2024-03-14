export class Helper {

    static extractPropertyValues(array: any[], property: string): string[] {
      return array.map<any>((item) => item[property]);
    }

}
  