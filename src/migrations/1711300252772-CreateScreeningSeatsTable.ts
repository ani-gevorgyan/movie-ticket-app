import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateScreeningSeatsTable1711300252772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'screeningSeats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'isAvailable',
            type: 'boolean',
          },
          {
            name: 'seatId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'ticketId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'screeningId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'screeningSeats',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seats',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'screeningSeats',
      new TableForeignKey({
        columnNames: ['screeningId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'screenings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'screeningSeats',
      new TableForeignKey({
        columnNames: ['ticketId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tickets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('screeningSeats');
  }
}
