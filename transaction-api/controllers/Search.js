const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
  
    try {
      const searchQuery = {
        dateOfSale: { $regex: `-${month.padStart(2, '0')}-` },
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } }
        ]
      };
  
      const transactions = await Transaction.find(searchQuery)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));
  
      const total = await Transaction.countDocuments(searchQuery);
  
      res.status(200).json({ transactions, total, page: parseInt(page), perPage: parseInt(perPage) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching transactions.');
    }
  };
  
  module.exports = { listTransactions };
  