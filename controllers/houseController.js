import House from '../models/house.js'
export const house = async(req, res) => {
    try {
        const houses = await House.find();
        res.json(houses);
      } catch (err) {
        console.error('Error during House query:', err.message); 
        res.status(500).send('Server Error');
      }
}
