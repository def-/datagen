import alert from 'cli-alerts';
import mysqlDataGenerator from './mysqlDataGenerator.js';
import kafkaDataGenerator from './kafkaDataGenerator.js';
import postgresDataGenerator from './postgresDataGenerator.js';
import webhookDataGenerator from './webhookDataGenerator.js';

interface GeneratorOptions {
    format: string;
    schema: string;
    start: number,
    iterations: number;
    initialSchema: string;
}

export default async function dataGenerator({
    format,
    schema,
    start,
    iterations,
    initialSchema
}: GeneratorOptions): Promise<void> {
    try {
        switch (format) {
            case 'postgres':
                if (!initialSchema.endsWith('.sql')) {
                    alert({
                        type: `error`,
                        name: `Producing SQL data is only supported with SQL schema files!`,
                        msg: ``
                    });
                    process.exit(1);
                }

                await postgresDataGenerator({ schema, start, iterations, initialSchema });
                break;
            case 'mysql':
                if (!initialSchema.endsWith('.sql')) {
                    alert({
                        type: `error`,
                        name: `Producing SQL data is only supported with SQL schema files!`,
                        msg: ``
                    });
                    process.exit(1);
                }

                await mysqlDataGenerator({ schema, start, iterations, initialSchema });
                break;
            case 'webhook':
                await webhookDataGenerator({ schema, start, iterations, initialSchema });
                break;
            default:
                await kafkaDataGenerator({ format, schema, start, iterations, initialSchema });
                break;
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};
