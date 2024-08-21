const getStatistics = async (req, res) => {
    const { month } = req.query;
  
    try {
      const searchQuery = { dateOfSale: { $regex: `-${month.padStart(2, '0')}-` } };
  
      const totalSoldItems = await Transaction.countDocuments({ ...searchQuery, sold: true });
      const totalNotSoldItems = await Transaction.countDocuments({ ...searchQuery, sold: false });
      const totalSaleAmount = await Transaction.aggregate([
        { $match: { ...searchQuery, sold: true } },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } }
      ]);
  
      res.status(200).json({
        totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
        totalSoldItems,
        totalNotSoldItems
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching statistics.');
    }
  };
  
  module.exports = { getStatistics };
  