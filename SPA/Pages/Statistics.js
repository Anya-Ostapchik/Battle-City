const Statistics = {
  id: "statistics",
  title: "Statistics",
  render: () => {
    return `
      <section class="statistics" id="statistics__content">
        <table class="statistics__table">
        <tr>
          <th>Name</th>
          <th>Points</th>
        </tr>
        </table>
        <a href="#main" class="back">BACK</a>
      </section>
    `;
  }
};

export default Statistics;
