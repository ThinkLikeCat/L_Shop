function validateMiddleware(validator) {
  return (req, res, next) => {
    const validation = validator(req.body);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Ошибка валидации данных',
          details: { errors: validation.errors }
        }
      });
    }
    
    next();
  };
}

module.exports = validateMiddleware;