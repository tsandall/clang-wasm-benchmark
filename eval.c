int json_version(void);

int eval(void) {
    int i;
    int x = 0;
    for(i = 0; i < 100000; i++) {
        x += json_version();
    }
    return x;
}
