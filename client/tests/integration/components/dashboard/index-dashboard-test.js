import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/index-dashboard', 'Integration | Component | dashboard/index dashboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboard/index-dashboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboard/index-dashboard}}
      template block text
    {{/dashboard/index-dashboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
