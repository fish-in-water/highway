const lowercase = function () {
  return {
    $iterator($value) {
      if ($value == null) {
        return $value;
      }

      return $value.toUpperCase();
    }
  }
};

export default lowercase;