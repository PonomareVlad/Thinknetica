function Shipyard(shipConstructor) {
    if (typeof shipConstructor !== 'function') return console.error('Ship Constructor must be a function !')
    console.info('Created shipyard for', shipConstructor.name)
    Object.assign(this, {
        shipConstructor,
        checkAccess: function (ship) {
            return ship instanceof this.shipConstructor ||
                console.error(ship.constructor.name, 'no access to', this.shipConstructor.name, 'shipyard !')
        },
        createShip: function (...args) {
            console.info('Created new', this.shipConstructor.name)
            return new this.shipConstructor(...args)
        },
        changeShipColor: function (ship, color) {
            console.info('Changing color...')
            Object.assign(ship.data, {color})
            return ship;
        },
        repairShip: function (ship) {
            if (!this.checkAccess(ship)) return ship;
            console.info('Repairing...')
            Object.assign(ship.data, {repaired: Date.now()})
            return ship;
        },
        swapShip: function (ship, ...args) {
            if (!this.checkAccess(ship)) return ship;
            console.info('Swapping...')
            const newShip = this.createShip(...args)
            Object.keys(ship).forEach(key => delete ship[key])
            Object.setPrototypeOf(ship, Object.getPrototypeOf(newShip))
            return Object.assign(ship, newShip)
        }
    })
}

function Ship() {
    let color = null;
    this.data = {
        set color(value) {
            color = value
        },
        get color() {
            return color
        }
    }
}

function MotorShip(power, bodyMaterial) {
    Object.setPrototypeOf(Object.getPrototypeOf(this), new Ship)
    Object.assign(this.data, {power, bodyMaterial})
}

function SailShip(sailCount, sailArea) {
    Object.setPrototypeOf(Object.getPrototypeOf(this), new Ship)
    Object.assign(this.data, {sailCount, sailArea})
}

function MotorShipyard() {
    return new Shipyard(MotorShip)
}

function SailShipyard() {
    return new Shipyard(SailShip)
}

// const badShipyard = new Shipyard({})
const sailShipyard = new SailShipyard()
const motorShipyard = new MotorShipyard()

const newMotorShip = motorShipyard.createShip(123, 'carbon')

console.debug(1, sailShipyard.changeShipColor(newMotorShip, 'transparent'))
console.debug(2, motorShipyard.swapShip(newMotorShip, 321, 'wood'))
console.debug(3, sailShipyard.repairShip(newMotorShip))

console.debug('Result:', newMotorShip)
