export const create = {
  email: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  password: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  typeId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  numberId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}
export const updateProfile = {
  email: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  name: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  nickname: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  typeId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  numberId: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  picture: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}

export const upgradeUser = {
  role: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  enabled: {
    type: 'boolean'
  }
}
export const changePassword = {
  id: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  password: {
    type: 'string',
    sanitize: {
      trim: true
    }
  },
  newPassword: {
    type: 'string',
    sanitize: {
      trim: true
    }
  }
}
export const userQuery = {
  numberId: {
    type: 'string',
    default: undefined,
    sanitize: {
      trim: true
    }
  }
}
