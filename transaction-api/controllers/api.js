const combinedData = async (req, res) => {
    try {
      const statistics = await getStatistics(req, res);
      const barChart = await getBarChartData(req, res);
      const pieChart = await getPieChartData(req, res);
  
      res.status(200).json({ statistics, barChart, pieChart });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching combined data.');
    }
  };
  
  module.exports = { combinedData };
  