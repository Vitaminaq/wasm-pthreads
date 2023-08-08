#include <iostream>

class MyClass
{
    public:
        MyClass(int x, std::string y)
            : x(x), y(y)
        {
        }

        void incrementX()
        {
            ++x;
        }

        int getX() const { return x; }
        void setX(int x_) { x = x_; }

        static std::string getStringFromInstance(const MyClass &instance)
        {
            return instance.y;
        }

    private:
        int x;
        std::string y;
};
