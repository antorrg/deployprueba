import envConfig from '../../Configs/envConfig.js'

export const createCar = {
  userId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  patent: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  mark: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  model: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  year: {
    type: 'string',
    default: '0',
    sanitize: {
      trim: true
    }
  },
  motorNum: {
    type: 'string',
    default: 'N/A',
    sanitize: {
      trim: true
    }
  },
  chassisNum: {
    type: 'string',
    default: 'N/A',
    sanitize: {
      trim: true
    }
  },
  observations: {
    type: 'string',
    default: 'Sin observaciones',
    sanitize: {
      trim: true
    }
  },
  picture: {
    type: 'string',
    default: envConfig.DefaultImgCar,
    sanitize: {
      trim: true
    }
  }
}

export const updateCar = {
  patent: {
    type: 'string',
    default: 'S/P',
    sanitize: {
      trim: true
    }
  },
  mark: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  model: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  year: {
    type: 'string',
    default: '0',
    sanitize: {
      trim: true
    }
  },
  motorNum: {
    type: 'string',
    default: 'N/A',
    sanitize: {
      trim: true
    }
  },
  chassisNum: {
    type: 'string',
    default: 'N/A',
    sanitize: {
      trim: true
    }
  },
  observations: {
    type: 'string',
    default: 'Sin observaciones',
    sanitize: {
      trim: true
    }
  },
  picture: {
    type: 'string',
    default: 'default.jpg',
    sanitize: {
      trim: true
    }
  }
}

export const changeOwner = {
  userId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}

export const carQuery = {
  patent: {
    type: 'string',
    default: undefined,
    sanitize: {
      trim: true
    }
  }
}
