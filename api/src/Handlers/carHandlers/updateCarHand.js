import car from '../../Controllers/carControllers/index.js'


const updateCarHand = async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
    try {
       const response = await car.updateCar(id, newData)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updDomCarHand = async (req, res) => {
    const {id}= req.params;
    const body = req.body;
    try {
        const response = await car.updateDomCar(id, body)
        res.status(200).json(response) 
     } catch (error) {
        res.status(error.status).json({error:error.message})
     }
}

export {updateCarHand, updDomCarHand}