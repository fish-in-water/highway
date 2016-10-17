var specs = require.context('.', true, /.spec.js$/)
specs.keys().forEach(specs)
