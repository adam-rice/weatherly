const React = require('react');
const ActionButton = require('./ActionButton');

class Body extends React.Component {
  render() {
    return (
      <section>
        {<ActionButton />}
      </section>
    );
  }
}

module.exports = Body;
