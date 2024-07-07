/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('balance').notNullable().defaultTo(0);
      });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
};
