const getPieChartData = async (req, res) => {
    const { month } = req.query;
  
    try {
      const searchQuery = { dateOfSale: { $regex: `-${month.padStart(2, '0')}-` } };
      const pieChartData = await Transaction.aggregate([
        { $match: searchQuery },
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);
  
      res.status(200).json(pieChartData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching pie chart data.');
    }
  };
  
  module.exports = { getPieChartData };
  