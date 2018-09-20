(module
    (import "env" "json_version" (func $json_version (result i32)))
    (func (export "eval") (result i32)
          (call $json_version)
    )
)
