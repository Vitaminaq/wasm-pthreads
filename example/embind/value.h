#include <iostream>

struct Point2f {
    float x;
    std::string y;
};

struct PersonRecord {
    std::string name;
    int age;
};

PersonRecord findPersonAtLocation(Point2f arg) {
    struct PersonRecord pr;
    pr.age = arg.x;
    pr.name = arg.y;

    return pr;
};
