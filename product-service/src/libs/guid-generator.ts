export class GuidGenerator {
    public static generateGuid(): string {
        return `${GuidGenerator.s4()}${GuidGenerator.s4()}-${GuidGenerator.s4()}-4${GuidGenerator.s4().substr(0, 3)}-${GuidGenerator.s4()}-${GuidGenerator.s4()}${GuidGenerator.s4()}${GuidGenerator.s4()}`.toLowerCase();
    }

    private static s4(): string {
        return (((Math.random() + 1) * 0x10000) | 0).toString(16).substring(1);
    }
}
